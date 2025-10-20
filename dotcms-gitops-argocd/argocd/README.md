# ArgoCD Application for dotCMS Development

This directory contains the ArgoCD Application manifest for deploying dotCMS in a development environment.

## Application

- **dotcms-application.yaml** - Development environment

## Deployment Instructions

### Deploy Development Environment
```bash
kubectl apply -f dotcms-application.yaml
```

## Configuration Details

### Development
- **Namespace**: `dotcms-dev`
- **Sync Policy**: Automated with self-heal and pruning enabled
- **Resources**: Minimal for cost efficiency
- **Debug**: Enabled
- **Domain**: dev.dotcms.local
- **Secret Management**: Uses `ignoreDifferences` for database secrets (see below)

## Prerequisites

1. ArgoCD installed in your cluster
2. Access to the dotCMS Helm chart repository
3. Proper RBAC permissions for ArgoCD
4. Namespaces created or ArgoCD configured to create them

## Monitoring

After deployment, you can monitor the applications in the ArgoCD UI:

1. Access ArgoCD UI (usually at `https://argocd.your-domain.com`)
2. Navigate to Applications
3. Check sync status and health of each environment

## Database Secret Management

### Why `ignoreDifferences` for Local Databases

When using local PostgreSQL with persistent volumes (PVCs), the database credentials are initialized once and stored in the persistent storage. On subsequent ArgoCD syncs, Helm regenerates secrets with new random passwords, but the database continues using the original credentials stored in the PVC. This mismatch causes authentication failures.

By using `ignoreDifferences`, ArgoCD preserves the original secret values across deployments, maintaining consistency with the persisted database credentials. This issue doesn't occur with external databases where credentials are managed outside the Kubernetes cluster and remain static across deployments.

### Configuration

The application is configured with `ignoreDifferences` to ignore password and username changes in database secrets:

```yaml
syncOptions:
  - RespectIgnoreDifferences=true
ignoreDifferences:
  - group: ""
    kind: Secret
    name: corp-dotcms-dev-localsecret-prod-database
    jsonPointers:
      - /data/password
      - /data/username
  - group: ""
    kind: Secret
    name: corp-dotcms-dev-localsecret-db-local-admin
    jsonPointers:
      - /data/password
      - /data/username
```

### Important Notes

- **Local databases only**: This configuration is only needed for local PostgreSQL instances with PVCs
- **First deployment**: Secrets are created normally on the first deployment
- **Subsequent deployments**: ArgoCD ignores changes to password/username fields
- **Manual updates**: If you need to change credentials, you must update both the secret AND the database manually

### Common Pitfall: `prune: false` is NOT the solution

Setting `prune: false` prevents ArgoCD from deleting resources, but it does **NOT** prevent secrets from being regenerated with new passwords. Always use `ignoreDifferences` for managing stateful database credentials.

## Troubleshooting

### Database Authentication Errors

**Symptom**: dotCMS pod fails with `password authentication failed` errors after image updates

**Cause**: Database secrets were regenerated but PostgreSQL still uses old credentials in PVC

**Solution**:
1. Verify `ignoreDifferences` is configured (see above)
2. Get current password from secret: `kubectl get secret corp-dotcms-dev-localsecret-prod-database -n dotcms-dev -o jsonpath='{.data.password}' | base64 -d`
3. Update PostgreSQL password: `kubectl exec -n dotcms-dev <db-pod> -- psql -U postgres_admin_user -d postgres -c "ALTER USER prod_user WITH PASSWORD '<new-password>';"`
4. Restart dotCMS pod: `kubectl delete pod <dotcms-pod> -n dotcms-dev`

### Other Issues

- **Sync Issues**: Check if the Git repository is accessible
- **Chart Issues**: Verify the Helm chart repository URL and version
- **Resource Issues**: Check if the cluster has sufficient resources
- **RBAC Issues**: Ensure ArgoCD has proper permissions

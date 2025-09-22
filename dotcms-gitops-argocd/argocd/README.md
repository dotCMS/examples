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
- **Sync Policy**: Automated with self-heal
- **Resources**: Minimal for cost efficiency
- **Debug**: Enabled
- **Domain**: dev.dotcms.local

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

## Troubleshooting

- **Sync Issues**: Check if the Git repository is accessible
- **Chart Issues**: Verify the Helm chart repository URL and version
- **Resource Issues**: Check if the cluster has sufficient resources
- **RBAC Issues**: Ensure ArgoCD has proper permissions

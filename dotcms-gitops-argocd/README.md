# dotCMS GitOps with ArgoCD

This directory contains configuration files for managing dotCMS deployments using GitOps principles with ArgoCD. This approach extends the basic Helm deployment by introducing continuous delivery and configuration management through Git.

## Overview

While Helm provides excellent packaging and installation capabilities for dotCMS on Kubernetes, ArgoCD adds a powerful layer of GitOps-based continuous delivery. This combination ensures that your dotCMS deployments remain synchronized with the configurations stored in Git, providing automated, reliable, and auditable deployments.

## What is GitOps?

GitOps is a methodology that uses Git as the single source of truth for declarative infrastructure and applications. With ArgoCD, you can:

- **Declarative Management**: Define your dotCMS configuration in Git repositories
- **Automated Sync**: ArgoCD continuously monitors your Git repository and ensures your cluster matches the desired state
- **Visual Dashboard**: Monitor the health and sync status of dotCMS deployments
- **Drift Detection**: Automatically detect and correct any manual changes that diverge from Git
- **Easy Rollbacks**: Revert deployments by simply reverting Git commits
- **Audit Trails**: Complete history of all configuration changes through Git

## Why Use ArgoCD with dotCMS?

Combining dotCMS with ArgoCD provides several key benefits:

### 🔄 **Continuous Delivery**
- Push configuration changes to Git, and ArgoCD automatically deploys them
- No more manual `kubectl` or `helm` commands for routine deployments
- Rapid and safe updates across all environments

### 📊 **Visual Monitoring**
- Real-time dashboard showing deployment health and sync status
- Easy identification of issues and deployment states
- Centralized view of all dotCMS instances

### 🔒 **Version Control & Consistency**
- All configurations stored in Git as the single source of truth
- Consistent deployments across dev, staging, and production environments
- Complete audit trail of all changes

### 🚀 **Safe Rollbacks**
- Instant rollbacks by reverting Git commits
- No need to remember complex rollback commands
- Git history provides clear context for changes

### 🏷️ **Stable Version Management**
- dotCMS publishes stable Docker image tags (e.g., `dotcms/dotcms:latest`, `dotcms/dotcms:5.3.8`)
- Clean version upgrades through Git-based configuration changes
- Easy tracking of which versions are deployed where

## Directory Structure

```
dotcms-gitops-argocd/
└── environments/
    ├── dev/
    │   └── values.yaml          # Development environment configuration
    ├── staging/
    │   └── values.yaml          # Staging environment configuration
    └── prod/
        └── values.yaml          # Production environment configuration
```

## Environment Configurations

Each environment contains a `values.yaml` file with environment-specific configurations:

### Development (`dev/values.yaml`)
- Minimal resource allocation for cost efficiency
- Debug mode enabled for troubleshooting
- Basic security configurations
- Single replica for simplicity

### Staging (`staging/values.yaml`)
- Intermediate resource allocation
- SSL/TLS enabled for security testing
- Enhanced monitoring and logging
- Two replicas for basic high availability

### Production (`prod/values.yaml`)
- Full resource allocation for performance
- Complete security hardening
- High availability with multiple replicas
- Comprehensive monitoring, alerting, and backup configurations
- Horizontal Pod Autoscaler for dynamic scaling

## Prerequisites

Before using this configuration, ensure you have:

- **Local Kubernetes cluster** (Docker Desktop, minikube, or similar)
- **kubectl** installed and configured
- **Helm** installed and working
- **ArgoCD** installed in your cluster
- **Git repository** (public or private) for storing these configurations

## Getting Started

1. **Fork or clone this repository** to your Git hosting service
2. **Customize the values.yaml files** for your specific environment needs
3. **Set up ArgoCD** in your Kubernetes cluster
4. **Create ArgoCD Applications** pointing to your Git repository
5. **Configure environment-specific secrets** (database passwords, license keys, etc.)

## Key Features by Environment

| Feature | Development | Staging | Production |
|---------|-------------|---------|------------|
| Replicas | 1 | 2 | 3+ |
| Resources | Minimal | Medium | High |
| Debug Mode | ✅ | ❌ | ❌ |
| SSL/TLS | ❌ | ✅ | ✅ |
| Monitoring | Basic | Enhanced | Complete |
| Auto-scaling | ❌ | ❌ | ✅ |
| Backup | ❌ | ❌ | ✅ |

## Next Steps

This configuration provides the foundation for a robust, GitOps-based dotCMS deployment strategy. Consider extending it with:

- **Secrets management** using tools like Sealed Secrets or External Secrets Operator
- **Multi-cluster deployments** for disaster recovery
- **Advanced monitoring** with Prometheus and Grafana
- **CI/CD integration** for automated testing and validation
- **Security scanning** and compliance checks

## Related Resources

- [How to Deploy dotCMS Using Helm Charts on Kubernetes](https://dotcms.com/docs/latest/kubernetes-deployment)
- [ArgoCD Documentation](https://argo-cd.readthedocs.io/)
- [GitOps Principles](https://www.gitops.tech/)
- [dotCMS Docker Images](https://hub.docker.com/r/dotcms/dotcms)

---

*This configuration follows GitOps best practices and provides a solid foundation for managing dotCMS deployments across multiple environments with ArgoCD.*

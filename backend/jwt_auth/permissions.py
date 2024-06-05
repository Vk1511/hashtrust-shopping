from rest_framework import permissions


class IsAdminOrSuperAdminOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow admin users to edit objects.
    """

    def has_permission(self, request, view):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        print("permissions.SAFE_METHODS", permissions.SAFE_METHODS)
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the admin user.
        return request.user and (request.user.is_staff or request.user.is_superuser)

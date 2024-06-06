from rest_framework import viewsets
from .serializers import CartItemSerializer
from .models import CartItem


class UserCartViewSet(viewsets.ModelViewSet):
    serializer_class = CartItemSerializer
    queryset = CartItem.objects.all()

    def get_queryset(self):
        queryset = CartItem.objects.filter(user=self.request.user.id)
        return queryset


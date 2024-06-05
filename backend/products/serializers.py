from rest_framework import serializers
from .models import Product, ProductCategory


class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = "__all__"


class ProductSerializer(serializers.ModelSerializer):
    category_title = serializers.SerializerMethodField("get_category_title")

    class Meta:
        model = Product
        fields = "__all__"
        read_only_fields = ["category_title"]

    def get_category_title(self, obj):
        if obj:
            return obj.category.name


class ProductCategoryCountSerializer(serializers.ModelSerializer):
    count = serializers.IntegerField()

    class Meta:
        model = ProductCategory
        fields = ["id", "name", "description", "count"]

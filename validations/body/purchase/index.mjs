export const init_purchase_validator = {
  billing_id: {
    errorMessage: "Billing ID is required",
    notEmpty: true
  },
  products: {
    isArray: {
      bail: true,
      options: {
        min: 1,
        errorMessage: "최소한 하나의 제품을 구매해야 합니다"
      }
    },
    errorMessage: "Products array is required"
  },
  "products.*.product_id": {
    notEmpty: true,
    errorMessage: "제품 목록의 각 필드에는 product_id가 첨부되어야 합니다."
  },
  "products.*.quantity": {
    isInt: true,
    errorMessage: "제품 목록의 각 필드에는 qauntity 첨부되어야 합니다."
  }
};

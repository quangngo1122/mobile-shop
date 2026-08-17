const { products, productTypes } = require("../data/fakeData");

// Get All Products with search and pagination
exports.getAllProducts = (req, res) => {
  try {
    const { filter, limit = 10, page = 0 } = req.query;
    let result = [...products];

    // Handle search filter
    if (filter && req.query.filter === "name") {
      const searchValue = req.query.filter; // This is the actual search value
      // The query param structure seems odd, let's check for the search term
      const searchTerm = Object.keys(req.query).find(
        (key) => key !== "filter" && key !== "limit" && key !== "page",
      );
      if (searchTerm && searchTerm !== "filter") {
        result = result.filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description
              .toLowerCase()
              .includes(searchTerm.toLowerCase()),
        );
      }
    }

    // Handle type filter
    if (req.query.filter === "type" && filter) {
      result = result.filter((product) => product.type === filter);
    }

    const pageNum = parseInt(page) || 0;
    const limitNum = parseInt(limit) || 10;
    const startIndex = pageNum * limitNum;

    const total = result.length;
    const data = result.slice(startIndex, startIndex + limitNum);

    return res.status(200).json({
      status: "OK",
      message: "Products retrieved successfully",
      data: data,
      total: total,
      page: pageNum,
      limit: limitNum,
    });
  } catch (error) {
    return res.status(500).json({ status: "ERR", message: error.message });
  }
};

// Get Product Details
exports.getProductDetails = (req, res) => {
  try {
    const { id } = req.params;

    const product = products.find((p) => p._id === id);
    if (!product) {
      return res
        .status(404)
        .json({ status: "ERR", message: "Product not found" });
    }

    return res.status(200).json({
      status: "OK",
      message: "Product details retrieved",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ status: "ERR", message: error.message });
  }
};

// Get All Product Types
exports.getAllProductTypes = (req, res) => {
  try {
    return res.status(200).json({
      status: "OK",
      message: "Product types retrieved",
      data: productTypes,
    });
  } catch (error) {
    return res.status(500).json({ status: "ERR", message: error.message });
  }
};

// Create Product
exports.createProduct = (req, res) => {
  try {
    const {
      name,
      type,
      price,
      image,
      description,
      countInStock,
      discount = 0,
    } = req.body;

    // Validation
    if (
      !name ||
      !type ||
      !price ||
      !image ||
      !description ||
      countInStock === undefined
    ) {
      return res
        .status(400)
        .json({ status: "ERR", message: "Please provide all required fields" });
    }

    // Create new product
    const newProduct = {
      _id: String(products.length + 1),
      name: name,
      type: type,
      price: price,
      rating: 0,
      image: image,
      description: description,
      countInStock: countInStock,
      selled: 0,
      discount: discount,
    };

    products.push(newProduct);

    return res.status(200).json({
      status: "OK",
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    return res.status(500).json({ status: "ERR", message: error.message });
  }
};

// Update Product
exports.updateProduct = (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      type,
      price,
      image,
      description,
      countInStock,
      discount,
      rating,
      selled,
    } = req.body;

    const productIndex = products.findIndex((p) => p._id === id);
    if (productIndex === -1) {
      return res
        .status(404)
        .json({ status: "ERR", message: "Product not found" });
    }

    // Update product fields
    if (name) products[productIndex].name = name;
    if (type) products[productIndex].type = type;
    if (price) products[productIndex].price = price;
    if (image) products[productIndex].image = image;
    if (description) products[productIndex].description = description;
    if (countInStock !== undefined)
      products[productIndex].countInStock = countInStock;
    if (discount !== undefined) products[productIndex].discount = discount;
    if (rating !== undefined) products[productIndex].rating = rating;
    if (selled !== undefined) products[productIndex].selled = selled;

    return res.status(200).json({
      status: "OK",
      message: "Product updated successfully",
      data: products[productIndex],
    });
  } catch (error) {
    return res.status(500).json({ status: "ERR", message: error.message });
  }
};

// Delete Product
exports.deleteProduct = (req, res) => {
  try {
    const { id } = req.params;

    const productIndex = products.findIndex((p) => p._id === id);
    if (productIndex === -1) {
      return res
        .status(404)
        .json({ status: "ERR", message: "Product not found" });
    }

    const deletedProduct = products.splice(productIndex, 1);

    return res.status(200).json({
      status: "OK",
      message: "Product deleted successfully",
      data: deletedProduct[0],
    });
  } catch (error) {
    return res.status(500).json({ status: "ERR", message: error.message });
  }
};

// Delete Many Products
exports.deleteManyProducts = (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids)) {
      return res
        .status(400)
        .json({ status: "ERR", message: "IDs must be an array" });
    }

    ids.forEach((id) => {
      const productIndex = products.findIndex((p) => p._id === id);
      if (productIndex !== -1) {
        products.splice(productIndex, 1);
      }
    });

    return res.status(200).json({
      status: "OK",
      message: "Products deleted successfully",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({ status: "ERR", message: error.message });
  }
};

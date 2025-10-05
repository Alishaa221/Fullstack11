class ProductsController {
    constructor(Product) {
        this.Product = Product;
    }

    async createProduct(req, res) {
        try {
            const product = new this.Product(req.body);
            await product.save();
            res.status(201).json(product);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllProducts(req, res) {
        try {
            const products = await this.Product.find();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await this.Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteProduct(req, res) {
        try {
            const { id } = req.params;
            const product = await this.Product.findByIdAndDelete(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default ProductsController;
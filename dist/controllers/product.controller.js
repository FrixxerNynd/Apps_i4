export const createProduct = async (req, res) => {
    try {
        const { name, description, quantity, price } = req.body;
        const newProduct = new Product({ name, description, quantity, price });
        const savedProduct = await newProduct.save();
        res.json({ product: savedProduct });
    }
    catch (error) {
        res.status(500).json({ error });
    }
};
export const getProducts = async (_req, res) => {
    const products = await Product.find();
    res.json({ products });
};
export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { name, description, quantity, price } = req.body;
    const updated = await Product.findByIdAndUpdate(id, { name, description, quantity, price }, { new: true });
    res.json({ product: updated });
};
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const deleted = await Product.findByIdAndUpdate(id, { status: false, deleteDate: new Date() }, { new: true });
    res.json({ product: deleted });
};

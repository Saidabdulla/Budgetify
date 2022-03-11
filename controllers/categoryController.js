const categories = [
    {
        name: "Entertainment",
    },
    {
        name: "Car",
    },
    {
        name: "Job",
    },
];

exports.getCategories = (req, res) => {
    res.status(200).json(categories);
};

exports.getCategoryById = (req, res) => {
    res.status(200).json(categories[req.params.id]);
};

exports.addCategory = (req, res) => {
    const category = {
        name: req.body.name,
    };

    categories.push(category);

    res.status(201).json(categories);
};

exports.updateCategory = (req, res) => {
    const category = { ...req.body };

    categories[req.params.id] = category;

    res.status(201).json(categories);
};

exports.deleteCategory = (req, res) => {
    categories.splice(req.params.id, 1);

    res.status(201).json(categories);
};

const Item = require('../models/Item');

exports.createItem = async (req, res) => {
  try {
    const { name, image, condition, location, description } = req.body;
    if (!name || !condition || !location) return res.status(400).json({ message: 'Missing required fields' });

    const item = new Item({ name, image, condition, location, description });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getItems = async (req, res) => {
  try {
    // support optional query filters: q, condition, location, status
    const { q, condition, location, status } = req.query;
    const filter = {};
    if (q) {
      const regex = new RegExp(q, 'i');
      filter.$or = [ { name: regex }, { description: regex } ];
    }
    if (condition) filter.condition = condition;
    if (location) filter.location = location;
    if (status) filter.status = status;

    const items = await Item.find(filter).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['available','exchanged'].includes(status)) return res.status(400).json({ message: 'Invalid status' });
    const item = await Item.findByIdAndUpdate(id, { status }, { new: true });
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const items = await Item.find(filter).sort({ createdAt: -1 });
res.json(items);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


exports.updateStatus = async (req, res) => {
try {
const { id } = req.params;
const { status } = req.body;
if (!['available','exchanged'].includes(status)) return res.status(400).json({ message: 'Invalid status' });
const item = await Item.findByIdAndUpdate(id, { status }, { new: true });
if (!item) return res.status(404).json({ message: 'Item not found' });
res.json(item);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};
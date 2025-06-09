const Product = require('../models/Product');

exports.handleChatQuery = async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ message: 'Query is required' });

  try {
    let filter = {};
       console.log("User message:", message);
    let products = [];
    


    // Extract price
    const priceMatch = message.match(/under\s*(\d+)/i);
    if (priceMatch) {
      const maxPrice = parseInt(priceMatch[1]);
      filter.price = { $lte: maxPrice };
      console.log("→ Price filter:", filter.price);
    }

    // Extract keyword
    const keyword = message.split(' ').find(word => word.length > 2);
    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { category: { $regex: keyword, $options: 'i' } }
        
      ];
      console.log("→ Keyword filter:", keyword);
    }
    console.log("Final filter being used:", filter);

    // Query database with combined filter
    products = await Product.find(filter).limit(5);

    if (!products.length) {
      return res.json({ message: "Sorry, no products found for your query." });
    }

    res.json({ message: "Here are some options:", products });
  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

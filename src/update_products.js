import mysql from "mysql2/promise";

async function main() {
  const conn = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sales_db",
  });

  await conn.query(
    `UPDATE products 
     SET 
       name = ?,
       slug = ?,
       regular_price = ?,
       sale_price = ?,
       discount_percentage = ?,
       featured_image = ?,
       gallery_images = ?,
       description = ?
     WHERE id = 'prod-1'`,
    [
      "Prestige 3.0L Multi Purpose Cooker - All-in-One Cooking Solution!",
      "prestige-3l-multi-purpose-cooker",
      1499,
      999,
      33,
      "/products/cooker-blue-main.png",
      JSON.stringify([
        "/products/thumb-red.png",
        "/products/thumb-blue.png",
        "/products/thumb-yellow.png",
        "/products/thumb-green.png",
      ]),
      "আপনার রান্নার কাজকে আরও সহজ এবং বৈচিত্র্যময় করতে নিয়ে এলো Prestige ৩.০ লিটার মাল্টি-পারপাস কুকার। এটি দিয়ে আপনি একই সাথে রান্না এবং ভাপে সেদ্ধ (Steaming) করার কাজ সেরে নিতে পারবেন।",
    ]
  );

  await conn.query(
    `UPDATE products 
     SET 
       name = ?,
       slug = ?,
       regular_price = ?,
       sale_price = ?,
       discount_percentage = ?,
       featured_image = ?,
       gallery_images = ?,
       description = ?
     WHERE id = 'prod-2'`,
    [
      "Intelligent Power Saving Device - স্মার্ট বিদ্যুৎ সাশ্রয়ী ডিভাইস (৯০V-২৫০V)",
      "intelligent-power-saving-device",
      999,
      499,
      50,
      "/products/related-power-saver.png",
      JSON.stringify(["/products/related-power-saver.png"]),
      "স্মার্ট বিদ্যুৎ সাশ্রয়ী ডিভাইস ৯০V-২৫০V যা আপনার বাসা ও অফিসের বিদ্যুতের অপচয় কমিয়ে আনবে।",
    ]
  );

  await conn.query(
    `UPDATE products 
     SET 
       name = ?,
       slug = ?,
       regular_price = ?,
       sale_price = ?,
       discount_percentage = ?,
       featured_image = ?,
       gallery_images = ?,
       description = ?
     WHERE id = 'prod-3'`,
    [
      "Mini Electric Cooker 1.8L - বহনযোগ্য মাল্টি কুকার",
      "mini-electric-cooker-1-8l",
      999,
      750,
      25,
      "/products/thumb-yellow.png",
      JSON.stringify(["/products/thumb-yellow.png", "/products/thumb-green.png"]),
      "সহজে বহনযোগ্য ১.৮ লিটার মিনি কুকার, দ্রুত নুডলস, ডিম বা ভাতের জন্য আদর্শ।",
    ]
  );

  console.log("Successfully updated products in MySQL!");
  await conn.end();
}

main().catch(console.error);

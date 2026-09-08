import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

// 1. Tabel Master Spesifikasi Produk
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  productName: text('product_name').notNull(),    
  diameter: integer('diameter').notNull(),         
  materialType: text('material_type').notNull(),   
});

// 2. Tabel Fisik Batangan di Gudang (Melacak Sisa Panjang)
export const stockItems = pgTable('stock_items', {
  id: serial('id').primaryKey(),
  productId: integer('product_id').references(() => products.id),
  serialNumber: text('serial_number').notNull().unique(), 
  originalLength: integer('original_length').notNull(),   
  currentLength: integer('current_length').notNull(),     
  status: text('status').notNull().default('Tersedia'),   
});

// 3. Tabel Surat Bukti Potong Transaksi
export const orders = pgTable('orders', {
  id: serial('id').primaryKey(),
  orderNumber: text('order_number').notNull().unique(),   
  productId: integer('product_id').references(() => products.id),
  stockItemId: integer('stock_item_id').references(() => stockItems.id),
  requestedLength: integer('requested_length').notNull(), 
  status: text('status').notNull().default('PROSES_POTONG_GUDANG'), 
  createdAt: timestamp('created_at').defaultNow(),
});

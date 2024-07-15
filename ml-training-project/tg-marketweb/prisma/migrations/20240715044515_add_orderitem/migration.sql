-- AlterTable
ALTER TABLE "ProductImage" ADD COLUMN     "orderitem_id" INTEGER;

-- AddForeignKey
ALTER TABLE "ProductImage" ADD CONSTRAINT "ProductImage_orderitem_id_fkey" FOREIGN KEY ("orderitem_id") REFERENCES "OrderItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

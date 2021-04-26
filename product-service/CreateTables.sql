--CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

--create table products (
--	id uuid primary key default uuid_generate_v4(),
--	title text not null,
--	description text,
--	price integer
--)

--create table stocks (
--	product_id uuid,
--	count integer,
--  	foreign key ("product_id") references "products" ("id")
--)

--insert into products (title, description, price, image) values 
--('Snowboard', 'Snowboard for advanced rider', 350, 'https://alpinesportsrental.com/wp-content/uploads/2015/01/custom_flying_v-300x150.jpg'),
--('Bindbings', 'Bindings for snowboard', 200, 'http://giroskuter.site/image/catalog/00HEAD/KREP/7/341007_nx_three.jpg'),
--('Ski', 'Cheap but cool ski', 180, 'https://velopark.com.ua/wa-data/public/shop/products/52/23/2352/images/2121/2121.300x0.jpg'),
--('Boots', 'Mens boots for snowboarding', 176, 'https://i.pinimg.com/736x/53/d1/e1/53d1e15eae29610cd57b2903b3b1f8c3--nike-boots-nike-snowboard-boots.jpg'),
--('Glasses', 'Snowboard glasses', 30, 'https://p7.hiclipart.com/preview/940/335/580/5bc2cb5842cba-thumbnail.jpg')

--insert into stocks (product_id, count) values 
--('a3b6eccd-ae64-41c0-9939-7b479cc6691e', 2),
--('1fc849af-32c1-4021-95dd-52b766a1f164', 7),
--('5132fcbe-3207-4bc2-8055-f960970aee1c', 5),
--('d1c3a1ab-30cf-4334-8671-c19a59f7b870', 1),
--('fb897ab1-1a95-4da5-adb3-2fb525297a56', 14)


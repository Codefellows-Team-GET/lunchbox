DROP TABLE IF EXISTS saved_res;
CREATE TABLE saved_res (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  walk VARCHAR(255),
  wait VARCHAR(255),
  total VARCHAR(255),
  price VARCHAR(255),
  rating VARCHAR(255)
);


INSERT INTO saved_res (name, walk, wait, total, price, rating)VALUES(
  'Subway',
  '4',
  '2',
  '10',
  '$',
  '★★★☆'
  );
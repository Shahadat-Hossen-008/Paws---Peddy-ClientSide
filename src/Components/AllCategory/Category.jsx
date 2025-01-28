import { Button } from '@mui/material';


function Category() {
  const allCategory = ['Dog', 'Cat', 'Rabbit', 'Fish'];

  return (
    <div className="my-10">
      {/* Title */}
      <h1 className="md:text-4xl font-display font-bold text-center my-4 text-red-500">
        Pets Category
      </h1>
      <p className="text-center text-gray-600 md:text-lg mb-6">
        Explore a variety of pets to find your perfect companion. Whether you
        <br/>
        love furry friends, aquatic life, or playful rabbits, we've got a pet category just for you!
      </p>
      {/* Categories Section */}
      <div className="flex justify-center gap-4 flex-wrap">
        {allCategory.map((category, index) => (
          <Button
            key={index}
            variant="outlined"
            color="primary"
            className="!px-6 !py-3 !text-lg !capitalize"
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Category;

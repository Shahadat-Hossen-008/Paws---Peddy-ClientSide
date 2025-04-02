import { Button } from '@mui/material';


function Category() {
  const allCategory = ['Dog', 'Cat', 'Rabbit', 'Fish'];

  return (
    <div className="md:my-10 my-6">
      {/* Title */}
      <h1 className=" text-2xl md:text-4xl font-display font-bold text-center md:my-4 my-2 text-red-500">
        Pets Category
      </h1>
      <p className="text-center md:text-lg mb-6 p-3">
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
            className="!px-4 !py-3 md:!text-lg capitalize !border-[var(--primary-color)] !text-[var(--primary-color)]"
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default Category;

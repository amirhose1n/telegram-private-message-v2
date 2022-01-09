class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const exceludeFileds = ['page', 'sort', 'limit', 'filter'];
    const queryObj = { ...this.queryString };
    exceludeFileds.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (val) => '$' + val);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      let sortValue = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortValue);
    }
    return this;
  }

  limitFields() {
    if (this.queryString.filter) {
      let filterValue = this.queryString.filter.split(',').join(' ');
      this.query = this.query.select(filterValue);
    } else {
      this.query = this.query.select(`-__v`);
    }
    return this;
  }

  pagination() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 20;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    // if (this.queryString.page) {
    //     let counts = await User.countDocuments();
    //     if (counts >= skip) {
    //       throw new Error("does't exist !!!");
    //     }
    //   }
    return this;
  }
}

module.exports = APIfeatures;

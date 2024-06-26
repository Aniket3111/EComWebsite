class Apifeatures {
  constructor(query, querystr) {
    this.query = query;
    this.querystr = querystr;
  }

  search() {
    const keyword = this.querystr.keyword
      ? {
          name: {
            $regex: this.querystr.keyword,
            $options: "i", // case insensitive
          },
        }
      : {};
    //console.log(keyword)
    this.query = this.query.find({ ...keyword });
    return this;
  }
  filter() {
    const querycopy = { ...this.querystr };

    //removing some fields
    const removefields = ["keyword", "page", "limit"];

    removefields.forEach((key) => delete querycopy[key]);

    //filter for price
    //console.log(querycopy);
    let querystr = JSON.stringify(querycopy);
    querystr = querystr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
    //console.log(querystr);
    this.query = this.query.find(JSON.parse(querystr));
    return this;
  }
  pagination(resultperpage) {
    const currentPage = Number(this.querystr.page) || 1;
    const skip = resultperpage * (currentPage - 1);

    this.query = this.query.limit(resultperpage).skip(skip);
    return this;
  }
}

module.exports = Apifeatures;

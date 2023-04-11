
class ApiFeatures {
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery
        this.queryString = queryString

    }



    //Pagination Logic----------------------------------------------------------------
    paginate() {
        let page = this.queryString.page * 1 || 1
        if (page < 1) page = 1
        let limit = 5
        let skip = (page - 1) * limit
        this.mongooseQuery.skip(skip).limit(limit)
        this.page = page
        this.limit = limit
        return this;
    }


    //Filter Logic ----------------------------------------------------------------
    filter() {
        let queryString = { ...this.queryString } // Spread To take Copy , Not Refrence ! 
        let excludedQuery = ['page', 'sort', 'keyword', 'fields'] //UnNeeded fields
        excludedQuery.forEach(el => delete queryString[el]) // Delete UnNeeded fields of the copied object

        queryString = JSON.stringify(queryString)                                                // Convert To String
        queryString = queryString.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)          //Replace string by adding $ at_start 
        queryString = JSON.parse(queryString)
        this.mongooseQuery.find(queryString)
        return this;
    }


    //sort Logic----------------------------------------------------------------
    sort() {
        if (this.queryString.sort) {
            let sortedBy = this.queryString.sort.split(',').join(' ')
            this.mongooseQuery.sort(sortedBy)
        }
        return this;


    }


    //Search Logic----------------------------------------------------------------
    search() {
        if (this.queryString.keyword) {
            let keyword = this.queryString.keyword
            this.mongooseQuery.find({
                $or: [{ name: { $regex: keyword, $options: 'i' } }
                    , { description: { $regex: keyword, $options: 'i' } }]
            })
        }
        return this;
    }


    //Selected Fields
    fields() {
        if (this.queryString.fields) {
            let fields = this.queryString.fields.split(',').join(' ')
            this.mongooseQuery.select(fields)
        }
        return this;
    }



}


module.exports = ApiFeatures

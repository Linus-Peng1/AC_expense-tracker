module.exports = {
  getCategoryIcon: function (recordCategory, categoryList) {
    const category = categoryList.find(category => category.categoryName === recordCategory)
    return category.categoryIcon
  }
}
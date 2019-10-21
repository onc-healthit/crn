package org.sitenv.spring.service;

import java.util.List;

import org.sitenv.spring.dao.CategoryDao;
import org.sitenv.spring.model.Category;
import org.sitenv.spring.model.Categories;
import org.sitenv.spring.model.DafCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryServiceImpl implements CategoryService {

	@Autowired
	private CategoryDao CategoryDao;

	@Override
	public Categories getAllCategories() {

		List<DafCategory> dafCategoryList = CategoryDao.getAllCategories();
		Category category = null;
		Categories categories = new Categories();

		if (dafCategoryList != null && dafCategoryList.size() > 0) {
			for (DafCategory dafCategory : dafCategoryList) {
				category = new Category();
				category.setCategoryId(dafCategory.getId());
				category.setCategoryName(dafCategory.getCategoryName());
				category.setCategoryDescription(dafCategory.getCategoryDescription());
				categories.getCategories().add(category);
			}
		}
		
		return categories;
	}

}

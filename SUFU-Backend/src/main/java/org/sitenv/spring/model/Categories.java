package org.sitenv.spring.model;

import java.util.ArrayList;
import java.util.List;

public class Categories {
	
	public Categories() {
		this.categories = new ArrayList<Category>();
	}
	
	private List<Category> categories;

	public List<Category> getCategories() {
		return categories;
	}

	public void setCategories(List<Category> categories) {
		this.categories = categories;
	}
}

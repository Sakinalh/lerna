export const getHeight = element => Math.floor(element.getBoundingClientRect().height);

export const getWidth = element => Math.floor(element.getBoundingClientRect().width);

export const getLeft = element => Math.floor(element.getBoundingClientRect().left);
export const formatStoredFilers = (storedFilters, filters) => {
  const formattedFilters = storedFilters.map((storedFilter) => {
    const _type = storedFilter.type;
    const display_name = storedFilter.name;

    for(let i = 0; i < filters?.filter_categories.length; i++) {
      for(let j = 0; j < filters?.filter_categories[i].filters.length; j++) {
        if(_type === filters.filter_categories[i].filters[j].type) {
          return {...storedFilter, operators: filters.filter_categories[i].filters[j].operators, display_name: display_name};
        }
      }
    }
  });

  return formattedFilters;
};
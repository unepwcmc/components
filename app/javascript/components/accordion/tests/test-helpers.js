export default wrapper => ({  
  accordionItems: () => wrapper.findAll('.accordion-item'),
  
  firstItemContent: () => wrapper.find('.accordion-item__content'),
  
  firstItemTitleText: () => wrapper.find('.accordion-item__title').text(),

  firstItemContentWrapper: () => wrapper.find('.accordion-item__content-wrapper'),

  toggleFirstItem: () => wrapper.find('.accordion-item__toggle').trigger('click'),

  firstItemToggleIcon: () => wrapper.find('.accordion-item__toggle i')

})
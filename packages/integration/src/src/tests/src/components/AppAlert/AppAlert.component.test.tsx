let props = {
    Title : "Hello",
    Txt : "What s up",
    Action ?: ()=> console.log("ahah")
    openModal : false
  };
  
  describe('test App alert', () => {
    test('Should display title Hello', () => {
      expect(myBeverage.delicious).toBeTruthy();
    });
  
    test('is not sour', () => {
      expect(myBeverage.sour).toBeFalsy();
    });
  });
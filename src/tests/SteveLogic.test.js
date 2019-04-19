import {addOne} from './SteveLogic'

describe('Tests Toggle Function', () => {
    it('should return a function', ()=>{
      expect(typeof addOne).toBe('function')
    })
  
    it('should return a number',()=>{
      const result = addOne(5)
      expect(typeof result).toBe('number')
    })
  
    it('should not return a string', ()=>{
      const result = addOne(5)
      expect(typeof result).not.toBe('string')
    })

    it('should not return an array', ()=>{
      const result = addOne(5)
      expect(typeof result).not.toBe('array')
    })
  
    it('should return truthy value if given a number', ()=>{
      const result = addOne(5)
      expect(result).toBeTruthy()
    })
  });

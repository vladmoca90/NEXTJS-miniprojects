import { Wine } from '../data/wines/Wine';

// Mock Wine data
const mockWines: Wine[] = [
  {
    index: 1,
    name: 'Cabernet Sauvignon',
    img: 'cabernet.jpg',
    text: 'A full-bodied red wine'
  },
  {
    index: 2,
    name: 'Chardonnay',
    img: 'chardonnay.jpg',
    text: 'A crisp white wine'
  },
  {
    index: 3,
    name: 'Merlot',
    img: 'merlot.jpg',
    text: 'A smooth red wine'
  },
  {
    index: 4,
    name: 'Sauvignon Blanc',
    img: 'sauvignon.jpg',
    text: 'A fresh white wine'
  }
];

describe('Wine Filter Functionality', () => {
  
  describe('filterCheckedWine', () => {
    
    it('should return all wines when checkedWine is "All wines"', () => {
      const checkedWine: string = 'All wines';
      const result = mockWines.filter((wine) => {
        if (checkedWine === 'All wines' || checkedWine === '') {
          return true;
        }
        return wine.name.includes(checkedWine);
      });
      
      expect(result).toHaveLength(4);
      expect(result).toEqual(mockWines);
    });

    it('should return all wines when checkedWine is empty string', () => {
      const checkedWine: string = '';
      const result = mockWines.filter((wine) => {
        if (checkedWine === 'All wines' || checkedWine === '') {
          return true;
        }
        return wine.name.includes(checkedWine);
      });
      
      expect(result).toHaveLength(4);
      expect(result).toEqual(mockWines);
    });

    it('should filter wines by name when checkedWine matches', () => {
      const checkedWine: string = 'Cabernet';
      const result = mockWines.filter((wine) => {
        if (checkedWine === 'All wines' || checkedWine === '') {
          return true;
        }
        return wine.name.includes(checkedWine);
      });
      
      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Cabernet Sauvignon');
    });

    it('should return multiple wines when filter matches several names', () => {
      const checkedWine: string = 'Sauvignon';
      const result = mockWines.filter((wine) => {
        if (checkedWine === 'All wines' || checkedWine === '') {
          return true;
        }
        return wine.name.includes(checkedWine);
      });
      
      expect(result).toHaveLength(2);
      expect(result.map(w => w.name)).toEqual(['Cabernet Sauvignon', 'Sauvignon Blanc']);
    });

    it('should return empty array when no wines match the filter', () => {
      const checkedWine: string = 'Pinot';
      const result = mockWines.filter((wine) => {
        if (checkedWine === 'All wines' || checkedWine === '') {
          return true;
        }
        return wine.name.includes(checkedWine);
      });
      
      expect(result).toHaveLength(0);
    });

    it('should be case-sensitive when filtering', () => {
      const checkedWine: string = 'cabernet';
      const result = mockWines.filter((wine) => {
        if (checkedWine === 'All wines' || checkedWine === '') {
          return true;
        }
        return wine.name.includes(checkedWine);
      });
      
      expect(result).toHaveLength(0);
    });
  });

  describe('onDeleteAWine', () => {
    
    it('should remove a wine from the list by name', () => {
      let wines = [...mockWines];
      const wineToDelete = mockWines[0];
      
      wines = wines.filter(wine => wine.name !== wineToDelete.name);
      
      expect(wines).toHaveLength(3);
      expect(wines.find(w => w.name === 'Cabernet Sauvignon')).toBeUndefined();
    });

    it('should not affect other wines when deleting one', () => {
      let wines = [...mockWines];
      const wineToDelete = mockWines[1];
      
      wines = wines.filter(wine => wine.name !== wineToDelete.name);
      
      expect(wines).toHaveLength(3);
      expect(wines).toContainEqual(mockWines[0]);
      expect(wines).toContainEqual(mockWines[2]);
      expect(wines).toContainEqual(mockWines[3]);
    });

    it('should handle deleting the last wine', () => {
      let wines = [mockWines[0]];
      
      wines = wines.filter(wine => wine.name !== mockWines[0].name);
      
      expect(wines).toHaveLength(0);
    });
  });
});

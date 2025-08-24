
export function numberToHebrewLetters(n: number): string {
  const lettersMap: [number, string][] = [
    [400,'ת'],[300,'ש'],[200,'ר'],[100,'ק'],
    [90,'צ'],[80,'פ'],[70,'ע'],[60,'ס'],[50,'נ'],
    [40,'מ'],[30,'ל'],[20,'כ'],[10,'י'],
    [9,'ט'],[8,'ח'],[7,'ז'],[6,'ו'],[5,'ה'],[4,'ד'],[3,'ג'],[2,'ב'],[1,'א'],
  ];
  if (n<=0) return String(n);
  let result='', num=n;
  for (const [v,l] of lettersMap){ while (num>=v){ result+=l; num-=v; } }
  result = result.replace('יה','טו').replace('יו','טז');
  if (result.length===1) return result+'׳';
  return result.slice(0,-1)+'״'+result.slice(-1);
}

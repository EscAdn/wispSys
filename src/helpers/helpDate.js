export const formatoFecha = (fecha, formato) => {
  const map = {
    dd: fecha.getDate(),
    mm: fecha.getMonth() + 1,
    yy: fecha.getFullYear().toString().slice(-2),
    yyyy: fecha.getFullYear(),
  };

  return formato.replace(/dd|mm|yyyy|yyy/gi, (matched) => map[matched]);
};

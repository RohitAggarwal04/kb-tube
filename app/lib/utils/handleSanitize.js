const handleSanitize = (stringWithAtSymbol) => {
    if (!stringWithAtSymbol){
        return '';
    }
    const stringWithoutAtSymbol = stringWithAtSymbol.replace(/@/g, '');
    return stringWithoutAtSymbol;
};

export default handleSanitize;

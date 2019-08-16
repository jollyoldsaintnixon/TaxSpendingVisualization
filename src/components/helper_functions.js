

export const assignBox = (array_of_objs, pie_num) => {
    const side = pie_num === 1 ? 'left-box-' : 'right-box-'
    array_of_objs.forEach((obj) => {
        
        let i = 4;
        switch (obj.key) {
            case "Other Taxes":
                i = 0 
                break;
            case "Income Taxes":
                i = 1 
                break;
            case "License Taxes":
                i = 2 
                break;
            case "Property Taxes":
                i = 3 
                break;
        }
        const box = document.getElementById(side + i)
        const decimals = String(obj.percent).split('.')[1]
        const integers = String(obj.percent).split('.')[0]
        const sliced = obj.percent ? integers + '.' + decimals.slice(0, 2) : 0
        box.innerHTML = sliced + '%'
    });
}
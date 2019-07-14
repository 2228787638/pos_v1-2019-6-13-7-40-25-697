'use strict';

//TODO: 请在该文件中实现练习要求并删除此注释

const decodeBarcodes= barcodes =>{
    const idAndCountMap = new Map();
	const items=new Array();
	
	for(const barcode of barcodes){
		idAndCountMap.set(barcode,idAndCountMap.get(barcode)+1||1);
	}
			 
	for(const idAndCount of idAndCountMap){
        const order={};
        if(idAndCount.indexOf('-')){
            order.id=idAndCount[0].split('-')[0];
            order.count=idAndCount[0].split('-')[1];
            items.push(order);
        }else{
            order.id=idAndCount[0];
            order.count=idAndCount[1];
            items.push(order);
        }
	}
	return items;
}
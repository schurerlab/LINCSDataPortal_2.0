package edu.miami.ccs.dcic;

public class CamelCase {
	public String CamelCase(String str) {
	String delimiter;
	if (str.contains("_")) {
		delimiter = "_";
	} else {
		delimiter = " ";
	}
	String CamelCase = "";
	String parts[] = str.split(delimiter);
	for (int i=0;i<parts.length;i++){
		String as = parts[i].toLowerCase();
		int a = as.length();
		if(i==0){
			CamelCase = CamelCase+parts[i].toLowerCase();
		}else{
			CamelCase = CamelCase + as.substring(0, 1).toUpperCase() + as.substring(1, a);

		}

		
	}
	return CamelCase;
	
}
}

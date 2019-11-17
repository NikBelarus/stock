package com.onlinestock.core.stockcell;

public enum StorageCondition {
    HEATED("H"),
    NOT_HEATED("N"),
    FREEZER("F"),
    OUTDOOR("O");

    private String abbreviation;

    StorageCondition(String abbr){
        abbreviation = abbr;
    }

    public String getAbbreviation(){
        return abbreviation;
    }
}

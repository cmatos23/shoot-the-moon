public with sharing class STM_ScoreboardController {
    @AuraEnabled(Cacheable=true)
    public static Player__c[] getPlayers(){
        return [SELECT Contact__r.Name, Score__c FROM Player__c WHERE Active__c = TRUE];
    } 
}

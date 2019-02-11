public with sharing class STM_ScoreboardController {
    @AuraEnabled(Cacheable=true)
    public static List<Player__c> getPlayers(){
        return [SELECT Contact__r.Name, Score__c FROM Player__c WHERE Active__c = TRUE ORDER BY Score__c DESC];
    }
    @AuraEnabled
    public static void savePlayers(List<Player__c> players){
        try{
            update players;
        }
        catch(DmlException ex){
            throw new AuraHandledException('Exception: ' + ex.getMessage());
        }
    }
}

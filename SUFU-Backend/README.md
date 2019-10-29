<<<<<<< HEAD
# fhir-R4
Welcome to FHIR R4 sample project

## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites
*	Java 8
*	Tomcat7 or 8
*	Postgres SQL DB 10.x
*	Maven 3.3.X

## Installing

### Postgres Configuration

**Load R4 schema and data**

Create the database by running the below command in command prompt

```
$ createdb -h localhost -p 5432 -U postgres R4
```

R4 database file `fhir-R4-db.backup` is located under root directory. Load schema and sample data using psql command

```
$ psql -U postgres -d R4 -f fhir-R4-db.backup 
```

### Tomcat Configuration 

**Update application database properties.**

application.properties file under fhir-server/src/main/resources was configured with below database username and passowrd. If you want to use different database username and password then update the values accordingly. 

```  
jdbc.url=jdbc:postgresql://localhost:5432/R4
jdbc.username=postgres
jdbc.password=postgres
```

### Built Application 
Run Maven build to build application war file. 
```
$ mvn clean install 
```
This will generate a war file under target/fhir-R4.war. Copy this to your tomcat webapp directory for deployment.

**Start Tomcat service**

If tomcat starts successfully then you should be able to access below end points. 

```
GET END POINTS:

1.http://localhost:<tomcatport>/fhir-R4/getcategories   -- Fetches all the categories available in the database. 
2.http://localhost:<tomcatport>/fhir-R4/fhir/Questionnaire -- Fetches all the Questionnaire resources available in the database.
3.http://localhost:<tomcatport>/fhir-R4/fhir/Questionnaire/9 -- Fetches specific Questionnaire resource based on the Id. 
4.http://localhost:<tomcatport>/fhir-R4/fhir/QuestionnaireResponse -- Fetches all QuestionnaireResponse resources available in the database.
5.http://localhost:<tomcatport>/fhir-R4/fhir/QuestionnaireResponse/1 -- Fetches specific QuestionnaireResponse based on the Id.

POST APIS: 

1.http://localhost:<tomcatport>/fhir-R4/fhir/Questionnaire -- Creates given Questionnaire resource with unique Id. 
2.http://localhost:<tomcatport>/fhir-R4/fhir/QuestionnaireResponse -- Creates QuestionnaireResponse resource with unique Id. 
```




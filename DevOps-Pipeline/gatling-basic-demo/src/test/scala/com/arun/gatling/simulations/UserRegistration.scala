package com.arun.gatling.simulations
import scala.concurrent.duration._

import io.gatling.core.Predef._
import io.gatling.http.Predef._
import io.gatling.jdbc.Predef._
import scala.util.Random

class UserRegistration extends Simulation {

        val httpProtocol = http
                .baseURL("http://localhost:9080")
                .inferHtmlResources()
                .acceptHeader("text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8")
                .acceptEncodingHeader("gzip, deflate")
                .acceptLanguageHeader("en-US,en;q=0.8,zu;q=0.6")
                .contentTypeHeader("application/x-www-form-urlencoded")
                .userAgentHeader("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.101 Safari/537.36")

        val headers_0 = Map(
                "Cache-Control" -> "max-age=0",
                "Origin" -> "http://localhost:9080",
                "Upgrade-Insecure-Requests" -> "1")

       var registerTerms = Iterator.continually(buildRegistrationFeeder())                        

        val scn = scenario("UserRegistration")
                .feed(registerTerms)
                .exec(http("New Registration")
                        .post("/user_en")
                        .headers(headers_0)
                        .formParam("firstname","${firstname}")
                        .formParam("name","${name}")
                        .formParam("email", "${name}@gmail.com"))

//        setUp(scn.inject(rampUsers(100).over(8))).protocols(httpProtocol)
        setUp(scn.inject(rampUsersPerSec(10) to 20 during(1 minutes) randomized)).protocols(httpProtocol)
        
        
        def buildRegistrationFeeder() : Map[String,String] = {
         Map(
           "firstname" -> Random.alphanumeric.take(3).mkString,
           "name" -> Random.alphanumeric.take(5).mkString
         ) 
          }
        
}

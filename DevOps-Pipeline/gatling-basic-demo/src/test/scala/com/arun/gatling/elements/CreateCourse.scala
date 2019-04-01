package com.automationrhapsody.gatling.elements

import io.gatling.core.Predef._
import io.gatling.http.Predef._

import scala.io.Source
import scala.util.Random

object CreateCourse {

  private val createNewCourse = exec(http("Add New Course")
                                  .post("/course")
                                  .body(ElFileBody("course.json"))
                                  .header(HttpHeaderNames.ContentType, HttpHeaderValues.ApplicationJson))

  private val uniqueIds: List[String] = Source
                                          .fromInputStream(getClass.getResourceAsStream("/course_ids.txt"))
                                          .getLines().toList

  private val createTerms = Iterator.continually(buildFeeder(uniqueIds))

  private val getAllCourses = exec(http("Get All Courses")
                                .get("/courses"))

  private def buildFeeder(dataList: List[String]): Map[String, Any] = {
    Map(
      "name" -> Random.alphanumeric.take(5).mkString,
      "department" -> Random.alphanumeric.take(5).mkString,
      "age" -> dataList(Random.nextInt(dataList.size)))
  }

  val addCourse = Constants.createScenario("Course Creation", createTerms, createNewCourse)

  val fetchAllCourses = Constants.createScenario("Fetch All Courses", createTerms, getAllCourses)
}
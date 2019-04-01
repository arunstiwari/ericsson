
Run Performance Test :
	`mvn package gatling:execute -Dgatling.simulationClass=com.arun.gatling.simulations.CourseSimulation`
	
	
	Running Jmeter test
	/Users/arun/Downloads/apache-jmeter-5.1.1/bin/jmeter.sh -n -t ./HOMEPAGE.jmx -l ./result.jtl -e -o ./jmeter
	
	
	docker run -p 8080:8080 -p 50000:50000 --name jenkins -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts
	
	6b13c5760a7047ac81f04d2f86c9bb85
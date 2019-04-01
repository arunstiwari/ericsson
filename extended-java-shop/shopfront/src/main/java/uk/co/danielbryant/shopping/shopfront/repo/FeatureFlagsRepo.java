package uk.co.danielbryant.shopping.shopfront.repo;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;
import uk.co.danielbryant.shopping.shopfront.services.dto.FlagDTO;

import java.util.Optional;

import static java.lang.String.format;
import static org.slf4j.LoggerFactory.getLogger;

@Component
public class FeatureFlagsRepo {
    private static final Logger LOGGER = getLogger(FeatureFlagsRepo.class);

    @Value("${featureFlagsUri}")
    private String featureFlagsUri;

    @Autowired
    @Qualifier(value = "stdRestTemplate")
    private RestTemplate restTemplate;

    public FeatureFlagsRepo() {
        // Needed by Spring
    }

    FeatureFlagsRepo(String featureFlagsUri, RestTemplate restTemplate) {
        this.featureFlagsUri = featureFlagsUri;
        this.restTemplate = restTemplate;
    }

    public Optional<FlagDTO> getFlag(long flagId) {
        try {
            final String flagUrl = featureFlagsUri + "/flags/" + flagId;
            LOGGER.info("Fetching flag from {}", flagUrl);
            final FlagDTO flag = restTemplate.getForObject(flagUrl, FlagDTO.class);
            return Optional.ofNullable(flag);
        } catch (HttpClientErrorException | HttpServerErrorException |
                ResourceAccessException | HttpMessageNotReadableException e) {
            final String msg = "Failed to retrieve flag %s; falling back to no flag";
            LOGGER.info(format(msg, flagId), e);
            return Optional.empty();
        }
    }
}

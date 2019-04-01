package uk.co.danielbryant.shopping.stockmanager.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import uk.co.danielbryant.shopping.stockmanager.model.v2.AmountAvailable;
import uk.co.danielbryant.shopping.stockmanager.model.v2.Stock;
import uk.co.danielbryant.shopping.stockmanager.repositories.StockRepository;

import javax.annotation.PostConstruct;

@Component
public class DataGenerator {

    private static final Logger LOGGER = LoggerFactory.getLogger(DataGenerator.class);

    private StockRepository stockRepository;

    @Autowired
    protected DataGenerator(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    @PostConstruct
    @Transactional
    public void init() {
        LOGGER.info("Generating synthetic data for demonstration purposes...");

        stockRepository.save(new Stock("1", "12345678", new AmountAvailable(5, 2)));
        stockRepository.save(new Stock("2", "34567890", new AmountAvailable(2, 2)));
        stockRepository.save(new Stock("3", "54326745", new AmountAvailable(999, 500)));
        stockRepository.save(new Stock("4", "93847614", new AmountAvailable(0, 0)));
        stockRepository.save(new Stock("5", "11856388", new AmountAvailable(1, 1)));

        LOGGER.info("... data generation complete");
    }
}
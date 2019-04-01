package uk.co.danielbryant.shopping.productcatalogue.model.v2;

import com.github.quiram.utils.ReflectiveToStringCompareEquals;

import static com.github.quiram.utils.ArgumentChecks.ensure;
import static com.github.quiram.utils.ArgumentChecks.ensureGreaterThan;
import static com.github.quiram.utils.ArgumentChecks.ensureNotNull;

public class BulkPrice extends ReflectiveToStringCompareEquals<BulkPrice> {
    private UnitPrice unit;
    private int min;

    public BulkPrice() {

    }

    public BulkPrice(UnitPrice unit, int min) {
        ensureNotNull(unit, "unit price");
        ensureGreaterThan(1, min, "minimum amount");
        this.unit = unit;
        this.min = min;
    }

    public UnitPrice getUnit() {
        return unit;
    }

    public void setUnit(UnitPrice unit) {
        this.unit = unit;
    }

    public int getMin() {
        return min;
    }

    public void setMin(int min) {
        this.min = min;
    }
}

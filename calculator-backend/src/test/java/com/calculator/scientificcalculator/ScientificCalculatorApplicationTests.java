package com.calculator.scientificcalculator;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

class ScientificCalculatorApplicationTests {

    private final CalculatorController calculatorController = new CalculatorController();

    @Test
    void testSqrt() {
        assertEquals(4.0, calculatorController.getSqrt(16.0));
    }

    @Test
    void testFactorial() {
        assertEquals(120, calculatorController.getFactorial(5));
    }

    @Test
    void testLn() {
        assertEquals(0.0, calculatorController.getLn(1.0));
    }

    @Test
    void testPower() {
        assertEquals(8.0, calculatorController.getPower(2.0, 3.0));
    }

}

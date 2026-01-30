
  /**
 * Collapsible Color Rows Script
 * Automatically collapses color rows after the 2nd row and adds toggle functionality
 */

(function() {
  'use strict';

  // Configuration
  const VISIBLE_ROWS = 2; // Number of rows to show by default

  /**
   * Initialize collapsible color rows for all product cards
   */
  function initColorToggle() {
    // Find all color panels
    const colorPanels = document.querySelectorAll('.dn-product-colors');
    
    colorPanels.forEach(function(panel) {
      setupColorPanel(panel);
    });
  }

  /**
   * Setup collapsible functionality for a single color panel
   * @param {HTMLElement} panel - The color panel container
   */
  function setupColorPanel(panel) {
    // Get all color cells (excluding the label)
    const colorCells = panel.querySelectorAll('.dn-color-panel-cell');
    
    // Need at least one color to measure
    if (colorCells.length === 0) {
      return;
    }

    // Calculate the actual height of rows based on rendered cells
    const rowHeight = calculateRowHeight(colorCells);
    const totalHeight = calculateTotalHeight(colorCells);
    const numberOfRows = Math.round(totalHeight / rowHeight);
    
    // Only proceed if there are more than the visible number of rows
    if (numberOfRows <= VISIBLE_ROWS) {
      return; // Not enough rows to warrant collapsing
    }

    // Calculate the collapsed height (2 rows worth)
    const collapsedHeight = rowHeight * VISIBLE_ROWS;

    // Create wrapper for color cells
    const wrapper = document.createElement('div');
    wrapper.className = 'dn-color-cells-wrapper collapsed';
    
    // Move all color cells into the wrapper
    colorCells.forEach(function(cell) {
      wrapper.appendChild(cell);
    });
    
    // Add wrapper to panel (after the label)
    const label = panel.querySelector('label');
    if (label) {
      label.parentNode.insertBefore(wrapper, label.nextSibling);
    } else {
      panel.appendChild(wrapper);
    }

    // Set the collapsed height dynamically based on actual measurements
    wrapper.style.setProperty('--collapsed-height', collapsedHeight + 'px');

    // Create gradient overlay
    const gradient = document.createElement('div');
    gradient.className = 'dn-color-gradient-overlay';
    panel.insertBefore(gradient, wrapper.nextSibling);

    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'dn-color-toggle-btn';
    toggleBtn.innerHTML = 'View all <span class="dn-toggle-icon">▼</span>';
    toggleBtn.setAttribute('type', 'button');
    toggleBtn.setAttribute('aria-expanded', 'false');
    
    // Add toggle button after the wrapper
    panel.appendChild(toggleBtn);

    // Add click event listener to toggle button
    toggleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      toggleColors(wrapper, toggleBtn, gradient);
    });
  }

  /**
   * Calculate the height of a single row by finding the height of the first color cell
   * @param {NodeList} colorCells - All color cell elements
   * @returns {number} Height of one row in pixels
   */
  function calculateRowHeight(colorCells) {
    if (colorCells.length === 0) return 0;
    
    // Get the height of the first cell (including margin)
    const firstCell = colorCells[0];
    const cellHeight = firstCell.offsetHeight;
    const cellStyle = window.getComputedStyle(firstCell);
    const marginTop = parseFloat(cellStyle.marginTop) || 0;
    const marginBottom = parseFloat(cellStyle.marginBottom) || 0;
    
    return cellHeight + marginTop + marginBottom;
  }

  /**
   * Calculate the total height of all color cells
   * @param {NodeList} colorCells - All color cell elements
   * @returns {number} Total height in pixels
   */
  function calculateTotalHeight(colorCells) {
    if (colorCells.length === 0) return 0;
    
    // Find the top of the first cell and bottom of the last cell
    const firstCell = colorCells[0];
    const lastCell = colorCells[colorCells.length - 1];
    
    const firstCellTop = firstCell.offsetTop;
    const lastCellBottom = lastCell.offsetTop + lastCell.offsetHeight;
    
    return lastCellBottom - firstCellTop;
  }

  /**
   * Toggle the visibility of color rows
   * @param {HTMLElement} wrapper - The color cells wrapper
   * @param {HTMLElement} button - The toggle button
   * @param {HTMLElement} gradient - The gradient overlay
   */
  function toggleColors(wrapper, button, gradient) {
    const isCollapsed = wrapper.classList.contains('collapsed');
    
    if (isCollapsed) {
      // Expand: show all colors
      wrapper.classList.remove('collapsed');
      wrapper.classList.add('expanded');
      button.classList.add('expanded');
      button.innerHTML = 'View less <span class="dn-toggle-icon">▼</span>';
      button.setAttribute('aria-expanded', 'true');
    } else {
      // Collapse: hide colors after 2nd row
      wrapper.classList.remove('expanded');
      wrapper.classList.add('collapsed');
      button.classList.remove('expanded');
      button.innerHTML = 'View all <span class="dn-toggle-icon">▼</span>';
      button.setAttribute('aria-expanded', 'false');
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initColorToggle);
  } else {
    // DOM is already ready
    initColorToggle();
  }

  // Re-initialize if new products are loaded dynamically (e.g., pagination)
  // You may need to adjust this based on your pagination implementation
  window.reinitColorToggle = initColorToggle;

})();
 
  

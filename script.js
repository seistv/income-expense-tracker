$(document).ready(function() {
    $('#add').click(function() {
        let amount = parseFloat($('#amount').val());
        let description = $('#description').val().trim();
        let type = $('#type').val();
        
        if (!amount || amount <= 0) {
            alert('Please enter a valid amount.');
            return;
        }
        if (!description) {
            alert('Please enter a description.');
            return;
        }
        
        let table = type === 'income' ? '#income-table tbody' : '#expense-table tbody';
        let totalField = type === 'income' ? '#income-total' : '#expense-total';
        
        $(table).append(`<tr><td>${description}</td><td class='text-end'>${amount.toFixed(2)}</td></tr>`);
        
        let currentTotal = parseFloat($(totalField).text());
        $(totalField).text((currentTotal + amount).toFixed(2));
        
        updateNetBalance();
        
        $('#amount').val('');
        $('#description').val('');
    });
    
    $('#clear').click(function() {
        $('#income-table tbody, #expense-table tbody').empty();
        $('#income-total, #expense-total, #net-balance').text('0');
        $('.warning').addClass('d-none');
        $('#net-balance').removeClass('text-danger');
    });
    
    function updateNetBalance() {
        let income = parseFloat($('#income-total').text());
        let expenses = parseFloat($('#expense-total').text());
        let netBalance = income - expenses;
    
        $('#net-balance').text(netBalance.toFixed(2));
    
        if (expenses > income) {
            $('.warning').show();  // Display warning
            $('#net-balance').addClass('text-danger');
        } else {
            $('.warning').hide();  // Hide warning
            $('#net-balance').removeClass('text-danger');
        }
    }
});
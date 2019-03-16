$(document).ready(function(){
    $("#form").submit(function(){
        event.preventDefault();
        i = "";
        result = "";
        searchReturn = $("#search").val();
        numResults = 0;
        data = {
            resource_id: '33159533-c2ee-4e11-902d-e2d250e2c84c',
            q: searchReturn
        };
        $.ajax({
            url: 'https://data.qld.gov.au/api/action/datastore_search',
            data: data,
            dataType: 'json',
            success: function(data) {
                if (numResults < data.result.total){
                    var x = data.result.total;
                    numResults = x;
                }
                data = {
                    resource_id: '33159533-c2ee-4e11-902d-e2d250e2c84c',
                    limit: numResults,
                    q: searchReturn
                };
                $.ajax({
                url: 'https://data.qld.gov.au/api/action/datastore_search',
                data: data,
                dataType: 'json',
                success: function(data) {
                    for (i = 0; i < data.result.limit; i++) {
                        result 
                            += "<p><h1>" 
                            + data.result.records[i]["Trading Name"]
                            + "</h1><br>"
                            + "Address:<br>"
                            + data.result.records[i]["Outlet Address"] 
                            + ", " 
                            + data.result.records[i]["Outlet Postcode"] 
                            + "<br>" 
                            + "Telephone Number:<br>"
                            + data.result.records[i]["Telephone Number"] 
                            + "<br>" 
                            + "Discount:<br>"
                            + data.result.records[i].Discount 
                            + "</p>";
                    }
                    $("#data").html(result);
                    if (numResults > 0 ) {
                        $("#results").html('<p>You are viewing ' + numResults + ' out of ' + data.result.total + ' results</p>'); }
                    else {
                        $("#results").html('<p>No results to show, you can try search things like cafe, your local postcode, a business...</p>')
                    }
                }
            });
        }});
    });
});
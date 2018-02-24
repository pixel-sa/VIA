<div class="col-md-8 col-md-offset-2 col-xs-12">
    <div id="vehicleForm" class="form-inline text-center" >
        <div class="form-group">
            <label for="year">Year:</label>
            <select name="year" id="year" class="vehicleSelect">
                <option value="">Select Year of vehicle</option>
                <option value="2018">2018</option>
                <option value="2017">2017</option>
                <option value="2016">2016</option>
                <option value="2015">2015</option>
                <option value="2014">2014</option>
                <option value="2013">2013</option>
                <option value="2012">2012</option>
                <option value="2011">2011</option>
                <option value="2010">2010</option>
                <option value="2009">2009</option>
                <option value="2008">2008</option>
                <option value="2007">2007</option>
                <option value="2006">2006</option>
                <option value="2005">2005</option>
                <option value="2004">2004</option>
                <option value="2003">2003</option>
                <option value="2002">2002</option>
                <option value="2001">2001</option>
                <option value="2000">2000</option>
                <option value="1999">1999</option>
                <option value="1998">1998</option>
                <option value="1997">1997</option>
                <option value="1996">1996</option>
                <option value="1995">1995</option>
                <option value="1994">1994</option>
                <option value="1993">1993</option>
                <option value="1992">1992</option>
                <option value="1991">1991</option>
                <option value="1990">1990</option>
                <option value="1989">1989</option>
                <option value="1988">1988</option>
                <option value="1987">1987</option>
                <option value="1986">1986</option>
                <option value="1985">1985</option>
                <option value="1984">1984</option>
            </select>
        </div>

        <div class="form-group">
            <label for="make">Make:</label>
            <select name="make" id="make" class="vehicleSelect"></select>
        </div>
        <div class="form-group">
            <label for="model">Model:</label>
            <select name="model" id="model" class="vehicleSelect">
            </select>
        </div>
    </div>
    <div id="additionalVehicleForms" class="form-inline text-center">
         %{--if additional vehicle attributes are needed to narrow down selection they will populate here--}%
    </div>
    <p id="vehicleFormError" class="error"></p>
    <div id="vehicleResult">
        %{--for now results will be displayed here for testing--}%
    </div>

</div>
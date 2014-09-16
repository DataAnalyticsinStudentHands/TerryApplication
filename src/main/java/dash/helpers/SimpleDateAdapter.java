package dash.helpers;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.xml.bind.annotation.adapters.XmlAdapter;

public class SimpleDateAdapter extends XmlAdapter<String, Date> {

	private static final String SIMPLE_DATE_FORMAT = "dd/MM/yyyy";
	private SimpleDateFormat dateFormat;

	public SimpleDateAdapter() {
		super();

		dateFormat = new SimpleDateFormat(SIMPLE_DATE_FORMAT);
	}

	@Override
	public Date unmarshal(String v) throws Exception {
		return dateFormat.parse(v);
	}

	@Override
	public String marshal(Date v) throws Exception {
		return dateFormat.format(v);
	}

}

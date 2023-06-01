package it.unisalento.pas.smartdumpsters.context;

import it.unisalento.pas.smartdumpsters.domain.Dumpster;
import org.springframework.stereotype.Component;

@Component
public class DumpsterContext {

    private Dumpster[] dumpsters;

    public Dumpster[] getDumpsters() {
        return dumpsters;
    }

    public void setDumpsters(Dumpster[] dumpsters) {
        this.dumpsters = dumpsters;
    }
}